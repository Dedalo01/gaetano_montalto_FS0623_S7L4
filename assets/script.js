const MY_PEXELS_KEY =
  "CWeWDFLW52hykrOc5Vx6HEtp5px63eoSdtA249oKSsSNAriQtCLbP6Ep";
const SEARCH_PEXELS_URL = "https://api.pexels.com/v1/search?query=";
const MAIN_SEARCH = "countryside";
const SECONDARY_SEARCH = "temple";

let photoArr = [];

const rowPhotos = document.querySelector(".album .row");

const header = {
  method: "GET",
  headers: {
    Authorization: MY_PEXELS_KEY,
  },
};

function renderCard() {
  let htmlPhotoList = "";

  photoArr.forEach((photo) => {
    htmlPhotoList += `<!-- card -->
      <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src="${photo.src.original}" />
                <div class="card-body">
                  <h5 class="card-title">${photo.alt}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary view-btn">
                        View
                      </button>
                      <button type="button" class="btn btn-sm btn-outline-secondary hide-btn" data-id="${photo.id}">
                        Hide
                      </button>
                    </div>
                    <small class="text-muted">${photo.id}</small>
                  </div>
                </div>
              </div>
            </div>
            <!-- end of card -->
      `;
  });
  rowPhotos.innerHTML = htmlPhotoList;
}

async function loadImages(url, head) {
  const res = await fetch(url, head);
  const data = await res.json();
  //console.log(data);

  photoArr = [...data.photos];
  console.log(photoArr);

  renderCard();

  localStorage.setItem("photoCards", JSON.stringify(photoArr));

  const allHideBtn = document.querySelectorAll(".hide-btn");

  for (let i = 0; i < allHideBtn.length; i++) {
    const singleHideBtn = allHideBtn[i];

    singleHideBtn.addEventListener("click", () => {
      photoArr.splice(photoArr.indexOf(singleHideBtn.dataset.id), 1);

      localStorage.setItem("photoCards", JSON.stringify(photoArr));
      console.log(photoArr);
      /* rowPhotos.innerHTML = "";

      const newRender = JSON.parse(localStorage.getItem("photoCards"));

      newRender.forEach(htmlPhoto, () => {
        rowPhotos.innerHTML += htmlPhoto;
      }); */
    });
  }
}

const loadPrimaryBtn = document.querySelector("#load-main-btn");
const loadSecondaryBtn = document.querySelector("#load-secondary-btn");

loadPrimaryBtn.addEventListener("click", () => {
  loadImages(`${SEARCH_PEXELS_URL}${MAIN_SEARCH}`, header);
});
loadSecondaryBtn.addEventListener("click", () => {
  loadImages(`${SEARCH_PEXELS_URL}${SECONDARY_SEARCH}`, header);
});
