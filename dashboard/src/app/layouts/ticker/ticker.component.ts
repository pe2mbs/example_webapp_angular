import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TickerDataService } from './service';
import { Subscription } from 'rxjs';

interface NEWS_ITEM
{
    A_ALERT:            string;        
    A_MESSAGE:          string;
    A_START_DATE:       string;
    A_END_DATE:         string;
    A_LINK:             string;
}

interface NEWS_MESSAGES
{
    A_NEWS:             NEWS_ITEM[];
    A_TOTAL_ITEMS:      number;        
    A_POLL_INTERVAL:    number;        
}

@Component({
    selector: 'news-ticker',
    template: `<div class="news-ticker" *ngIf="newsAvailable">
    <div class="news-bar">
        <div class="ticker-wrap">
            <div #newsbar class="ticker">
                <span *ngFor="let news_item of news.A_NEWS" class="ticker__item">
                    <span class="news_alert" *ngIf="news_item.A_ALERT">{{ news_item.A_PERIOD }} {{ news_item.A_MESSAGE + " " }}</span>
                    <span class="news_normal" *ngIf="news_item.A_ALERT === false">{{ news_item.A_PERIOD }} {{ news_item.A_MESSAGE  + " " }}</span>
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
    news: NEWS_MESSAGES; 
    subscribedEvent: Subscription = null;
    constructor( public dataService: TickerDataService ) 
    { 
        return;
    }

    setMessage( msgs: NEWS_MESSAGES )
    {
        let value = 60;
        this.news = msgs;
        this.newsAvailable = this.news.A_TOTAL_ITEMS > 0;
        console.log( msgs );
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
            }, 500 );
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
        }, msgs.A_POLL_INTERVAL * 1000 );
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
