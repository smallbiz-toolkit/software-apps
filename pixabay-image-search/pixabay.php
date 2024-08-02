<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <title>Free Images Gallery - Commercial & Personal Use</title>
  
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" rel="stylesheet">
  <style>
  .container, .container-lg, .container-md, .container-sm {
    max-width: 100%;
	}
  .card-img-top {
	height: 200px;
	width: auto;
	object-fit: cover;
	}
	.btn-xs {
	  padding: 2px 5px;
	  font-size: 0.8em;
	}
	.margin-top-25 {
	margin-top:25px;
	}
	.margin-top-5 {
	margin-top:5px;
	}

  </style>
</head>
<body>
  <div class="container">
  
<form id="search-form" class="row g-3">
  <div class="col">
    <input type="text" class="form-control" id="search-input" placeholder="Search term" maxlength="100">
  </div>
  <div class="col">
    <select class="form-select" id="search-image-type">
	  <option value="all" selected>All</option>
	  <option value="photo">Photo</option>
	  <option value="illustration">Illustration</option>
	  <option value="vector">Vector</option>
	</select>
  </div>
  <div class="col">
    <select class="form-select" id="search-orientation">
      <option value="all" selected>All</option>
      <option value="horizontal">Horizontal</option>
      <option value="vertical">Vertical</option>
    </select>
  </div>
  <div class="col">
    <select class="form-select" id="search-category">
	  <option value="" selected>Choose...</option>
	  <option value="backgrounds">Backgrounds</option>
	  <option value="fashion">Fashion</option>
	  <option value="nature">Nature</option>
	  <option value="science">Science</option>
	  <option value="education">Education</option>
	  <option value="feelings">Feelings</option>
	  <option value="health">Health</option>
	  <option value="people">People</option>
	  <option value="religion">Religion</option>
	  <option value="places">Places</option>
	  <option value="animals">Animals</option>
	  <option value="industry">Industry</option>
	  <option value="computer">Computer</option>
	  <option value="food">Food</option>
	  <option value="sports">Sports</option>
	  <option value="transportation">Transportation</option>
	  <option value="travel">Travel</option>
	  <option value="buildings">Buildings</option>
	  <option value="business">Business</option>
	  <option value="music">Music</option>
	</select>
  </div>
  <div class="col-auto form-check margin-top-25">
    <input type="checkbox" class="form-check-input" id="search-safesearch" checked>
    <label class="form-check-label" for="search-safesearch"> Safe Search</label>
  </div>
  <div class="col-auto">
      <input type="submit" class="btn btn-primary btn-sm margin-top-5" value="Submit">
  </div>
</form>
	
    <div id="gallery" class="row">
      <!-- Images will be inserted here -->
    </div>
    
    <div class="d-flex justify-content-between mt-3">
      <button id="previous-btn" class="btn btn-primary">Previous</button>
		<a href="https://pixabay.com/" target=_"blank" style="margin:3px 5px 5px 0;font-size:12px;line-height:1.5;color:#555;display:block;float:left;padding:1px 1px 1px;border:1px solid #ccc">
		<i style="display:block;width:68px;height:18px;overflow:hidden"><img src="images/logo.svg" style="width:94px"></i> Free Images</a>
      <button id="next-btn" class="btn btn-primary">Next</button>
    </div>
  </div>
  
  <!--modals -->
  <!-- Success Modal -->
<!-- Success Modal -->
<div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="successModalLabel">Image Link Copied!</h5>
      </div>
      <div class="modal-body">
        Image URL copied to clipboard. After clicking "Go to Pixlr", you will be redirected to Pixlr where you can paste the URL, just choose the Load url button.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-info" id="successCloseBtn">Continue to Pixlr</button>
      </div>
    </div>
  </div>
</div>

<!-- Failure Modal -->
<div class="modal fade" id="failureModal" tabindex="-1" aria-labelledby="failureModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="failureModalLabel">Failure</h5>
      </div>
      <div class="modal-body">
        Failed to copy image URL. Please try again.
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

<!-- Image Preview Modal -->
<div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="previewModalLabel">Image Preview</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-center">
        <img id="previewImg" src="" class="img-fluid">
      </div>
    </div>
  </div>
</div>
</div>
  
  <script src="https://code.jquery.com/jquery-3.6.0.min.js?v3"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
  <script src="js/script-search-canva.js?v=5"></script>
  <script>
	  $('#previewModal').on('shown.bs.modal', function (e) {
	  $('.modal').css('top', window.parent.scrollY + 20 + 'px');
	});
	$('#successModal').on('shown.bs.modal', function (e) {
	  $('.modal').css('top', window.parent.scrollY + 20 + 'px');
	});
  </script>
</body>
</html>