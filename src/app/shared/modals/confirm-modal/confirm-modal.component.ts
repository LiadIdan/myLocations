import { Component } from '@angular/core';
import { faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  title!: string;
  content!: string;
  icons = { faTimes, faTrashAlt };

  constructor(private _activeModal: NgbActiveModal) {}

  onClose(confirmed = false): void {
    this._activeModal.close(confirmed);
  }
}
