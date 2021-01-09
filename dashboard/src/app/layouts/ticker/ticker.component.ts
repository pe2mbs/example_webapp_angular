import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { GcTickerDataService } from './service';
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
    selector: 'gc-news-ticker',
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
export class GcTickerComponent implements AfterViewInit 
{
    @ViewChild( "newsbar", { static: false } ) ticker: ElementRef;
    newsAvailable: boolean = false;
    news: NewsMessages; 
	subscribedEvent: Subscription = null;
	triggerEvent = new EventEmitter<any>();
    constructor( public dataService: GcTickerDataService ) 
    { 
        return;
    }

    setMessage( msgs: NewsMessages )
    {
		this.news = msgs;
        this.newsAvailable = this.news.N_TOTAL_ITEMS > 0;
		let time: number = 300;
		if ( msgs.N_POLL_INTERVAL > 0 )
		{
			time = msgs.N_POLL_INTERVAL;
		}
        setTimeout( () => { 
            this.triggerEvent.emit();
        }, time * 1000 );
    }

    ngAfterViewInit() 
    {
		this.triggerEvent.subscribe( () => {
			if ( this.subscribedEvent != null )
            {
				this.subscribedEvent.unsubscribe();
			}
			this.subscribedEvent = this.dataService.getNews().subscribe( result => { 
				this.setMessage( result );
				if ( this.ticker )
                {
					const value = 60;
                    this.ticker.nativeElement.style.animationDuration = `${value}s`;
                } 
			} );       
		} );
		setTimeout( () => { 
            this.triggerEvent.emit();
        }, 5 * 1000 );
        return;
    }
}
