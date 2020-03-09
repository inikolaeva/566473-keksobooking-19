'use strict';

(function () {
  var URL = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };
  function createXHR(method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    return xhr;
  }

  function getData(onSuccess, onError) {
    var method = 'GET';
    createXHR(method, URL[method], onSuccess, onError).send();
  }

  function postData(data, onSuccess, onError) {
    var method = 'POST';
    createXHR(method, URL[method], onSuccess, onError).send(data);
  }

  window.load = {
    getData: getData,
    postData: postData
  };

})();
