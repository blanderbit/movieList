import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
    selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective {
    _isActive = false;
    @Input('count') count: number = 5;
    @Input('isActive') set isActive(value: boolean){
        this._isActive = value;
        this.onLoad(value)
    };
    get isActive() { return this._isActive; }

    @Output('loadMore') loadMore: EventEmitter<number> = new EventEmitter();
    constructor(
        private el: ElementRef
    ) {
        this.onLoad(this.isActive)
    }

    @HostListener('scroll', ['$event'])  onScroll() {
        const {
            scrollTop,
            clientHeight,
            scrollHeight
        } = this.el.nativeElement
        if (scrollTop + clientHeight >= scrollHeight) {
            this.onLoad(this.isActive)
        }
    }

    onLoad(value?: boolean){
        if(value) {
            this.loadMore.emit(this.count);
        }
    }

}
