export async function createModalUi(data) {

    var newTripModal = document.createElement('div');
    newTripModal.classList.add('trip_info');

    console.log("::createModalUi:::")
    console.log(data);
    let content = '';


    let iconUrl = `https://www.weatherbit.io/static/img/icons/${data.weather.weather.icon}.png`

    content += `
        <div id="tripModal" class="modal fade" tabindex="-1">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">${data.cityInfo.name} , ${data.cityInfo.countryName}</h5>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div class="modal-body">
                      <div class="container-fluid">
                          <div class="media row">
                              <img src="${data.imageUrl}" class="images mr-2 col-10 col-md-5" alt="Trip Location Image">
                              <div class="media-body col-12 col-lg-7">
                                  <h4 class="mt-0">Trip to: <span>${data.cityInfo.name}</span></h4>
                                  <ul>
                                  <li>Arrival: ${data.startDate}</li>
                                  <li>Departure: ${data.endDate}</li>
                                  <li>Duration: ${data.duration} days</li>
                                </ul>
                              </div>
                          </div>
                          <div class="media row">
                              <img src="${iconUrl}" class="images mr-2 col-5 col-md-3" alt="weather Image" ">
                        <div class="media-body col-12 col-lg-7 ">
                          <h4 class="mt-0 ">Weather Forecast</h4>
                          <ul>
                            <li>Max Temperature: ${data.weather.max_temp} <span>°C</span></li>
                            <li>Min Temperature: ${data.weather.min_temp} <span>°C</span></li>
                            <li>${data.weather.weather.description}</li>
                          </ul>
                        </div>                  
                    </div>
                  </div>
                  <div class="modal-footer ">
                      <button type="button " class="btn btn-secondary " data-dismiss="modal ">Cancel</button>
                      <button type="button " class="btn btn-primary " onclick="return Client.handleSave(event)">Save</button>
                  </div>
              </div>
          </div>
          </div>
       </div>`;

    newTripModal.innerHTML = content;

    console.log(newTripModal.innerHTML);

    return newTripModal;



}