import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, OnDestroy, OnInit, Output, Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CoreSidebarService} from './sidebar.service';
import {CoreMatchMediaService} from '@core/services/match-media.service';


@Component({
  selector: 'core-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoreSidebarComponent implements OnInit, OnDestroy {
  // Name
  @Input()
  name: string;

  // Key
  @Input()
  key: string;

  // Position
  @Input()
  position: 'left' | 'right';

  // Open
  @HostBinding('class.open')
  opened: boolean;

  // Locked Open
  @Input()
  lockedOpen: string;

  // isLockedOpen
  @HostBinding('class.locked-open')
  isLockedOpen: boolean;


  // Invisible overlay
  @Input()
  invisibleOverlay: boolean;

  // Opened changed
  @Output()
  openedChanged: EventEmitter<boolean>;

  // Private
  private _wasActive: boolean;
  private _backdrop: HTMLElement | null = null;
  private _player: AnimationPlayer;
  private _unsubscribeAll: Subject<any>;

  @HostBinding('class.animations-enabled')
  private _animationsEnabled: boolean;

  /**
   * Constructor
   *
   * @param {AnimationBuilder} _animationBuilder
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {ElementRef} _elementRef
   * @param {CoreMatchMediaService} _coreMatchMediaService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {MediaObserver} _mediaObserver
   * @param {Renderer2} _renderer
   */
  constructor(
    private _animationBuilder: AnimationBuilder,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef,
    private _coreMatchMediaService: CoreMatchMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    private _renderer: Renderer2
  ) {
    // Set the defaults
    this.openedChanged = new EventEmitter();
    this.opened = false;
    this.position = 'left';
    this.invisibleOverlay = false;

    // Set the private defaults
    this._animationsEnabled = false;
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Register the sidebar
    this._coreSidebarService.register(this.name, this);

    // Setup visibility
    this._setupVisibility();

    // Setup position
    this._setupPosition();

    // Setup lockedOpen
    this._setupLockedOpen();

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unregister the sidebar
    this._coreSidebarService.unregister(this.name);

    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setup the visibility of the sidebar
   *
   * @private
   */
  private _setupVisibility(): void {
    // Remove the existing box-shadow
    this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');

    // Make the sidebar invisible
    this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
  }

  /**
   * Setup the sidebar position
   *
   * @private
   */
  private _setupPosition(): void {
    // Add the correct class name to the sidebar
    // element depending on the position attribute
    if (this.position === 'right') {
      this._renderer.addClass(this._elementRef.nativeElement, 'right-positioned');
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'left-positioned');
    }
  }

  /**
   * Setup the lockedOpen handler
   *
   * @private
   */
  private _setupLockedOpen(): void {
    // Return if the lockedOpen wasn't set
    if (!this.lockedOpen) {
      // Return
      return;
    }

    // Set the wasActive for the first time
    this._wasActive = false;

    // Show the sidebar
    this._showSidebar();

    // Act on every media change
    this._coreMatchMediaService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {

        // Get the active status
        const isActive = this._mediaObserver.isActive(this.lockedOpen);

        // If the both status are the same, don't act
        if (this._wasActive === isActive) {
          return;
        }

        // Activate the lockedOpen
        if (isActive) {
          // Set the lockedOpen status
          this.isLockedOpen = true;

          // Show the sidebar
          this._showSidebar();

          // Force the the opened status to true
          this.opened = true;

          // Emit the 'openedChanged' event
          this.openedChanged.emit(this.opened);

          // Hide the backdrop if any exists
          this._hideBackdrop();
        }
        // De-Activate the lockedOpen
        else {
          // Set the lockedOpen status
          this.isLockedOpen = false;

          // Force the the opened status to close
          this.opened = false;

          // Emit the 'openedChanged' event
          this.openedChanged.emit(this.opened);

          // Hide the sidebar
          this._hideSidebar();
        }

        // Store the new active status
        this._wasActive = isActive;
      });
  }

  /**
   * Show the backdrop
   *
   * @private
   */
  private _showBackdrop(): void {
    // Create the backdrop element
    this._backdrop = this._renderer.createElement('div');

    // Add a class to the backdrop element
    this._backdrop.classList.add('core-sidebar-overlay');

    // Add a class depending on the invisibleOverlay option
    if (this.invisibleOverlay) {
      this._backdrop.classList.add('core-sidebar-overlay-invisible');
    }

    // Append the backdrop to the parent of the sidebar
    this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdrop);

    // Create the enter animation and attach it to the player
    this._player =
      this._animationBuilder
        .build([
          animate('300ms ease', style({opacity: 1}))
        ]).create(this._backdrop);

    // Play the animation
    this._player.play();

    // Add an event listener to the overlay
    this._backdrop.addEventListener('click', () => {
        this.close();
      }
    );

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Hide the backdrop
   *
   * @private
   */
  private _hideBackdrop(): void {
    if (!this._backdrop) {
      return;
    }

    // Create the leave animation and attach it to the player
    this._player =
      this._animationBuilder
        .build([
          animate('300ms ease', style({opacity: 0}))
        ]).create(this._backdrop);

    // Play the animation
    this._player.play();

    // Once the animation is done...
    this._player.onDone(() => {

      // If the backdrop still exists...
      if (this._backdrop) {
        // Remove the backdrop
        this._backdrop.parentNode.removeChild(this._backdrop);
        this._backdrop = null;
      }
    });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Change some properties of the sidebar
   * and make it visible
   *
   * @private
   */
  private _showSidebar(): void {
    // Remove the box-shadow style
    this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');

    // Make the sidebar invisible
    this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Change some properties of the sidebar
   * and make it invisible
   *
   * @private
   */
  private _hideSidebar(delay = true): void {
    const delayAmount = delay ? 300 : 0;

    // Add a delay so close animation can play
    setTimeout(() => {

      // Remove the box-shadow
      this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');

      // Make the sidebar invisible
      this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    }, delayAmount);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Enable the animations
   *
   * @private
   */
  private _enableAnimations(): void {
    // Return if animations already enabled
    if (this._animationsEnabled) {
      return;
    }

    // Enable the animations
    this._animationsEnabled = true;

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open the sidebar
   */
  open(): void {
    if (this.opened || this.isLockedOpen) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Show the sidebar
    this._showSidebar();

    // Show the backdrop
    this._showBackdrop();

    // Set the opened status
    this.opened = true;

    // Emit the 'openedChanged' event
    this.openedChanged.emit(this.opened);

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Close the sidebar
   */
  close(): void {
    if (!this.opened || this.isLockedOpen) {
      return;
    }

    // Enable the animations
    this._enableAnimations();

    // Hide the backdrop
    this._hideBackdrop();

    // Set the opened status
    this.opened = false;

    // Emit the 'openedChanged' event
    this.openedChanged.emit(this.opened);

    // Hide the sidebar
    this._hideSidebar();

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Toggle open/close the sidebar
   */
  toggleOpen(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

}

@NgModule({
  declarations: [
    CoreSidebarComponent
  ],
  exports: [
    CoreSidebarComponent
  ]
})
export class CoreSidebarModule {
}
