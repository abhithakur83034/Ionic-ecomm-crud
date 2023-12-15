import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/srvices/auth.service';
import { EventService } from 'src/app/srvices/event.service';
import { LoaderService } from 'src/app/srvices/loader.service';
import { ProductService } from 'src/app/srvices/product.service';
import { ReviewService } from 'src/app/srvices/review.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  reviewForm!: FormGroup;
  productId: any;
  filterProduct: any;
  allReview: any;
  user: any;
  userData: any;
  editEnbale: boolean = false;
  reviewInput: any;
  showForm: any;
  show: boolean[] = [];
  filterItemId: any[] = [];
  filterReviewId: any[] = [];
  filterlikeBy: any[] = [];
  setShow: boolean | undefined;
  clickIndex:any;

  constructor(
    private event: EventService,
    private route: ActivatedRoute,
    private product: ProductService,
    private review: ReviewService,
    private storage: AuthService,
    private loader: LoaderService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      review: new FormControl('', [Validators.required]),
    });

    this.storage
      .getFromStorage('user')
      .then((res: any) => {
        // console.log(res);
        this.userData = JSON.parse(res);
        // console.log(this.userData);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  get e() {
    return this.reviewForm.controls;
  }

  ionViewWillEnter() {
    // console.log("ion View Pr");
    this.showSingleProduct();
    this.getproductReview();
  }

  getproductReview() {
    this.review.getreviews().subscribe((res: any) => {
      if (res.status === 'success') {
        this.allReview = res.allReview.filter(
          (item: any) => item.itemId === this.productId
        );
  
        this.filterlikeBy = this.allReview.filter((item: any) =>
          item.likeBy.includes(this.userData._id)
        );
  
        console.log(this.allReview);
        console.log(this.filterlikeBy);
  
        this.filterlikeBy.forEach((likedReview: any) => {
          const index = this.allReview.findIndex(
            (item: any) => item._id === likedReview._id
          );
          if (index !== -1) {
            this.show[index] = true;
          }
        });
  
        this.manageReviewtoggle();
      }
    });
  }
  

  togglelike(likeData: any, index: any) {
    console.log('clicked', index);
    this.clickIndex = index
    console.log(likeData);

    let formData = new FormData();
    formData.append('itemId', likeData.itemId);
    formData.append('reviewId', likeData._id);
    formData.append('likedBy', this.userData._id);

    this.product.likeProduct(formData).subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.status === 'liked') {
          this.show[index] = true;
          this.loader.showToast(res.message);
        } else if (res.status === 'disliked') {
          this.show[index] = false;
          this.loader.showToast(res.message);
        }
        // Update likes after the like/dislike operation
        this.getproductReview();
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  // getReviewLike() {
  //   this.product.LikesReviews().subscribe((res: any) => {
  // console.log(res.getlikes);
  //     this.filterItemId = res.getlikes.filter(
  //       (item: any) => item.itemId === this.productId
  //     );

  //     this.filterlikeBy = this.filterItemId.reduce((acc: any[], item: any) => {
  //       if (item.likedBy.includes(this.userData._id)) {
  //         acc.push(item);
  //       }
  //       return acc;
  //     }, []);

  // console.log(this.filterlikeBy);
  //   });
  // }

  navigateBack() {
    // this.navController.back();
    this.event.refreshPage.next({ pageRefrence: 'prductdetails' });
  }

  showSingleProduct() {
    this.product.getPRoduct().subscribe((res: any) => {
      // console.log(res);
      if (res.status === 'success') {
        this.filterProduct = res.message.filter(
          (item: any) => item._id === this.productId
        );
        // console.log(this.filterProduct);
      }
    });
  }

  addProductReview() {
    // console.log('values', this.reviewForm.value);
    let formData = new FormData();
    formData.append('image', this.userData.image);
    formData.append('userId', this.userData._id);
    formData.append('name', this.userData.name);
    formData.append('itemId', this.productId);
    formData.append('review', this.reviewForm.value.review);
    this.review.addReviews(formData).subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.status === 'success') {
          this.loader.showToast('review added..');
          this.getproductReview();
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }

  editButton(review: any) {
    this.editEnbale = true;
    this.reviewInput = review.review;
    // console.log(this.reviewInput);
  }

  editProReview(review: any) {
    // console.log('Product Review', review);
    let data = {
      itemId: review.itemId,
      userId: review.userId,
      reviews: this.reviewInput,
    };
    this.review.editReview(data).subscribe((res: any) => {
      // console.log('edit Pro ', res);
      if (res.status === 'success') {
        this.editEnbale = false;
        this.getproductReview();
        // console.log("getReview",this.getReviews());
      }
    });
  }

  toggleItem: any;

  manageReviewtoggle() {
    this.toggleItem = this.allReview.filter(
      (item: any) => item.userId === this.userData._id
    );

    // console.log('toggleItem', this.toggleItem);

    this.showForm = this.toggleItem.length === 0;
    // console.log('showform', this.showForm);
  }
}
