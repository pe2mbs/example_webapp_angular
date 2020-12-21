import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TickerDataService } from './service';
import { Subscription } from 'rxjs';

interface NewsItem
{
	N_ID: number;
	N_ACTIVE: boolean;
	N_ALERT: string;        
	N_KEEP: string; 
    N_MESSAGE: string;
    N_START_DATE: string;
	N_END_DATE: string;
	N_PERIOD?: string;
}

interface NewsMessages
{
    N_NEWS: NewsItem[];
    N_TOTAL_ITEMS: number;        
    N_POLL_INTERVAL: number;        
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'news-ticker',
    template: `<div class="news-ticker" *ngIf="newsAvailable">
    <div class="news-bar">
        <div class="ticker-wrap">
            <div #newsbar class="ticker">
                <span *ngFor="let news_item of news.N_NEWS" class="ticker__item">
                    <span class="news_alert" *ngIf="news_item.N_ALERT">{{ news_item.N_PERIOD }} {{ news_item.N_MESSAGE + " " }}</span>
					<span class="news_normal" *ngIf="news_item.N_ALERT === false">
						{{ news_item.N_PERIOD }} {{ news_item.N_MESSAGE  + " " }}
					</span>
                </span>
            </div>
        </div>
    </div>
</div>`,
    styleUrls: [ './ticker.component.scss' ],
})
export class TickerComponent implements OnInit, AfterViewInit 
{
    @ViewChild( "newsbar", { static: false } ) ticker: ElementRef;
    newsAvailable: boolean = false;
    news: NewsMessages; 
    subscribedEvent: Subscription = null;
    constructor( public dataService: TickerDataService ) 
    { 
        return;
    }

    setMessage( msgs: NewsMessages )
    {
        const value = 60;
		this.news = msgs;
		console.log( 'NewsMessages', msgs );
        this.newsAvailable = this.news.N_TOTAL_ITEMS > 0;
		console.log( msgs );
		let time: number;
		if ( msgs.N_POLL_INTERVAL > 0 )
		{
			time = msgs.N_POLL_INTERVAL;
		}
		else
		{
			time = 30;
		}
        if ( this.ticker )
        {
            this.ticker.nativeElement.style.animationDuration = `${value}s`;
        }
        else
        {
            setTimeout( () => { 
                if ( this.ticker )
                {
                    this.ticker.nativeElement.style.animationDuration = `${value}s`;
                }       
            }, time * 1000 );
        }
        setTimeout( () => { 
            if ( this.subscribedEvent != null )
            {
                this.subscribedEvent.unsubscribe();
                this.subscribedEvent = null;
            }
            this.subscribedEvent = this.dataService.getNews().subscribe( result => { 
                this.setMessage( result );
            } );
        }, time * 1000 );
    }

    ngOnInit() 
    {       
        console.log( this.ticker );
        return;
    }

    ngAfterViewInit() 
    {
        this.subscribedEvent = this.dataService.getNews().subscribe( result => { 
            this.setMessage( result );
        } );       
        return;
    }
}
