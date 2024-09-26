import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  httpCliente = inject(HttpClient);
  baseUrl = `${environment.URL}/posts`;

  getPosts() {
    return this.httpCliente.get<PostModel[]>(this.baseUrl);
  }

  findById(id: string) {
    return this.httpCliente.get<PostModel>(`${this.baseUrl}/${id}`);
  }

  likePost(post: PostModel) {
    return this.httpCliente.patch(`${this.baseUrl}/${post.id}`, {
      like: !post.like,
    });
  }

  editarPost(id: string, post: PostModel) {
    return this.httpCliente.patch(`${this.baseUrl}/${id}`, {
      title: post.title,
      text: post.text,
    });
  }

  excluirPost(id: string) {
    return this.httpCliente.delete(`${this.baseUrl}/${id}`);
  }

  novoPost(post: PostModel) {
    return this.httpCliente.post(this.baseUrl, post);
  }

  search(term: string) {
    return this.httpCliente.get<PostModel[]>(
      `${this.baseUrl}?text_like=${term}`
    );
  }
}
