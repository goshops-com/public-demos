
const paginationTemplate = `
        <div class="product-pagination">
          <nav>
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link">Previous</a>
              </li>
              {{#each pages}}
                {{#if isDots}}
                  <li class="page-item disabled">
                    <span class="page-link">...</span>
                  </li>
                {{else}}
                  {{#if active}}
                    <li class="page-item active">
                      <a class="page-link" href="javascript:;">{{this.pageNumber}}</a>
                    </li>
                  {{else}}
                    <li class="page-item">
                      <a class="page-link" href="javascript:;">{{this.pageNumber}}</a>
                    </li>
                  {{/if}}
                {{/if}}
              {{/each}}
              <li class="page-item">
                <a class="page-link" href="javascript:;">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        `;

        const templateProductList = `
              <div class="product-grid mt-4">
                  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {{#each products}}
                    <div class="col">
                      <div class="card border shadow-none">
                        <div class="position-relative overflow-hidden">
                          <div class="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
                            <a href="javascript:;" class="heart-link" onclick="handleHeartClick(event, '{{id}}')"><i class="bi bi-heart"></i></a>
                            <a href="javascript:;"><i class="bi bi-basket3"></i></a>
                            <a href="javascript:;"><i class="bi bi-zoom-in"></i></a>
                          </div>
                          <a href="#/product-detail/{{id}}">
                            <img src="{{image}}" class="card-img-top" alt="...">
                          </a>
                        </div>
                        <div class="card-body border-top">
                          <h5 class="mb-0 fw-bold product-short-title">{{title}}</h5>
                          <p class="mb-0 product-short-name">{{description}}</p>
                          <div class="product-price d-flex align-items-center gap-2 mt-2">
                            <div class="h6 fw-bold">{{price}}</div>
                            <div class="h6 fw-light text-muted text-decoration-line-through">{{originalPrice}}</div>
                            <div class="h6 fw-bold text-danger">{{discount}}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {{/each}}
                  </div>
                </div>`;

const categoryTemplate = `
<div class="categories-wrapper height-1 p-1">
  {{#each categories}}
  <div class="form-check">
    <input class="form-check-input category-checkbox" type="checkbox" value="{{fieldValue}}" id="chekCate{{@index}}">
    <label class="form-check-label" for="chekCate{{@index}}">
      <span>{{fieldValue}}</span><span class="product-number">({{count}})</span>
    </label>
  </div>
  {{/each}}
</div>`;


const colorTemplate = `
<div class="color-wrapper height-1 p-1">
  {{#each colors}}
  <div class="form-check">
    <input class="form-check-input color-checkbox" type="checkbox" value="{{fieldId}}" id="chekColor{{@index}}">
    <label class="form-check-label" for="chekColor{{@index}}">
      <i class="bi bi-circle-fill me-1 text-{{lowercaseValue}}"></i><span>{{fieldValue}}</span><span class="product-number">({{count}})</span>
    </label>
  </div>
  {{/each}}
</div>`;

