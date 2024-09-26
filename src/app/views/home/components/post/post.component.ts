import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostModel } from '../../../../models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
	@Input() post!: PostModel;
	@Output() liked = new EventEmitter();
	@Output() edited = new EventEmitter();

	like(){
		console.log(this.post);
		this.liked.emit(this.post);
	}
	editar(){
		this.edited.emit(this.post);
	}
}
