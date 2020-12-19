export class Subscribers {
    constructor() {
        this.observableSubscriptions = [];
        return;
    }
    /***************************************************************************************************
    / When dealing with RxJs Observables and Subscriptions, it can easily happen, that you leak some memory.
    / That is because your component is destroyed, but the function you registered inside of the observable
    / is not. That way, you not only leak memory but probably also encounter some odd behavior.
    /***************************************************************************************************/
    registerSubscription(subscription) {
        this.observableSubscriptions.push(subscription);
        return;
    }
    unregisterSubscription(subscription) {
        this.observableSubscriptions.splice(this.observableSubscriptions.indexOf(subscription), 1);
        return;
    }
    /***************************************************************************************************
    / To prevent memory leajs, make sure to unsubscribe from your subscriptions, when the component is destroyed.
    / One good place to do so, would be the ngOnDestroy lifecycle hook.
    /***************************************************************************************************/
    ngOnDestroy() {
        for (let subscription of this.observableSubscriptions) {
            subscription.unsubscribe();
            // console.log( 'kill subscriptions' );
        }
    }
}
//# sourceMappingURL=subscribers.js.map