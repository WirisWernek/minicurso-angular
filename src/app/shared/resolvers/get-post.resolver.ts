import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { PostService } from '../../services/post.service';

export const getPost = (route: ActivatedRouteSnapshot) => {
  const postService = inject(PostService);
  const id = route.paramMap.get('id');
  console.log(id);
  if (id) {
    return postService.findById(id!);
  }
  return null;
};
