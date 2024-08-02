$('#search-form').submit(function(event) {
    event.preventDefault();
    params.q = $('#search-input').val();
    params.image_type = $('#search-image-type').val();
    params.orientation = $('#search-orientation').val();
    params.safesearch = $('#search-safesearch').is(':checked') ? 'true' : 'false';
	params.category = $('#search-category').val();

    // Reset the current page to 1
    currentPage = 1;
	
    // Load the page with the new parameters
    loadPage(currentPage);
});

// Define the parameters
let params = {
   q: 'funny',
   image_type: 'all',
   lang: 'en',
   orientation: 'horizontal',
   category: '',
   min_width: '0',
   min_height: '0',
   colors: '',
   editors_choice: 'false',
   safesearch: 'true',
   order: 'popular',
   per_page: '18',
   page: '1',
};

let currentPage = 1; // Set the initial current page to 1

// Function to create a card for each item
function createCard(item) {
    let imgUrl = item.largeImageURL; // changed from item.webformatURL to item.largeImageURL
    let card = `
        <div class="col" style="margin-bottom:25px;">
            <div class="card h-100">
                <img src="${item.webformatURL}" class="card-img-top" alt="${item.tags}">
                <div class="card-body text-center">
                    <!--<h5 class="card-title">${item.user}</h5>-->
                    <p class="card-text"><small>Views: ${item.views}<br>Downloads: ${item.downloads}</small></p>
                </div>
                <div class="card-footer text-center bg-black">
                    <a href="javascript:void(0)" onclick="downloadImage('${imgUrl}','${imgUrl}', ${currentPage})" class="btn btn-success btn-sm float-start">Download</a>
					<button onclick="copyUrlAndOpenCanva('${imgUrl}')" class="btn btn-info btn-sm btn-xs float-end" style="margin-top:5px;">Edit in Pixlr</button>
                </div>
            </div>
        </div>
    `;
    return card;
}

function copyUrlAndOpenCanva(url) {
    // Create a temporary textarea element to copy from
    var textarea = document.createElement("textarea");
    textarea.textContent = url;
    // Append the textarea to the body
    document.body.append(textarea);
    // Select the text
    textarea.select();
    // Attempt to copy
    var successful = false;
    try { 
        successful = document.execCommand('copy'); 
    } catch(err) { 
        console.log('Failed to copy', err); 
    } finally {
        textarea.remove(); // Removes the temporary element from the DOM
    }
	if(successful){
	  var successModal = new bootstrap.Modal(document.getElementById('successModal'), {})
	  successModal.show();

	  document.getElementById('successCloseBtn').addEventListener('click', function() {
		window.open('https://pixlr.com/x/', '_blank');
	  });
	} else {
	  var failureModal = new bootstrap.Modal(document.getElementById('failureModal'), {})
	  failureModal.show();
	}
}

function downloadImage(originalUrl, url, page) {
   fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
         const url = window.URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.style.display = 'none';
         a.href = url;
         let extension = "";
         if(originalUrl.lastIndexOf(".") >-1) {
            extension = originalUrl.substring(originalUrl.lastIndexOf(".")+1);
            if(extension !== "png" && extension !== "jpg") {
               extension = "jpg";
            }
         } else {
            extension = "jpg";
         }
         // Append the page number to the filename
         a.download = `image_${page}.${extension}`;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(url);
         document.body.removeChild(a);
      })
      .catch(_ => alert("Download failed."));
}

function loadPage(page) {
   params.page = page.toString();
   let queryString = $.param(params);

   $.getJSON('test-json.php?' + queryString, function(data) {
      let gallery = $('#gallery');
      gallery.empty();

      for (let item of data.hits) {
         let card = createCard(item);
         gallery.append(card);
      }
	  window.scrollTo(0, 0); // Scroll to top after loading images
   });
}

// Bind click handlers to previous and next buttons
$('#previous-btn').click(function() {
   if (currentPage > 1) {
      currentPage--;
      loadPage(currentPage);
      window.scrollTo(0, 0); // Added this line
   }
});

$('#next-btn').click(function() {
   currentPage++;
   loadPage(currentPage);
});

// Initial load of the first page
loadPage(currentPage);