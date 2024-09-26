import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../services/post.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PostModel } from './../../models/post.model';
import { PostComponent } from './components/post/post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, PostComponent, AsyncPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  postService = inject(PostService);
  router = inject(Router);
  posts$!: Observable<PostModel[]>;
  termSearch: string = '';

  ngOnInit(): void {
    this._refreshPosts();
  }

  liked(post: PostModel) {
    this.postService.likePost(post).subscribe({
      complete: () => {
        this._refreshPosts();
      },
    });
  }
 
  edited(post: PostModel) {
    this.router.navigateByUrl(`form/${post.id}`);
  }
  
  novo() {
    this.router.navigateByUrl(`form`);
  }

  search() {
    this._refreshPosts();
  }

  clear() {
    this.termSearch = '';
    this._refreshPosts();
  }

  private _refreshPosts() {
    this.posts$ = this.postService.search(this.termSearch);
  }
}
