let notify = function(message) {
  // OS notification
  chrome.notifications.create('', {
    type: 'basic',
    iconUrl: 'images/get_started32.png',
    title: message,
    message: "app "+message
  }, function(notificationId) {});
};

let selectFolder = document.getElementById('selectFolder');
let showFolder = document.getElementById('showFolder');

let doEntry = function(entry) {
  if (entry.isDirectory) {
    var dirReader = entry.createReader();
    dirReader.readEntries(function(results) {
      console.log(results.length);
      results.forEach(function(item) { 
        console.log(item);
      });
    }, function(e){
      console.error(e);
    });
  }
};

selectFolder.onclick = function(element) {
  notify('select folder clicked');

  chrome.fileSystem.chooseEntry({
    type: 'openDirectory',
      //suggestedName: 'todos.txt',
      //accepts: [ { description: 'Text files (*.txt)',
      //             extensions: ['txt']} ],
      acceptsAllTypes: true
    }, function(entry, fileEntries) {
      chrome.fileSystem.getDisplayPath(entry, function(path){notify(path)});
      var retained_id = chrome.fileSystem.retainEntry(entry);
      chrome.storage.sync.set({ "chosenDir": retained_id });
      console.log(retained_id);
      console.log(fileEntries);
      doEntry(entry);
    }
  );
};

showFolder.onclick = function(element) {
  chrome.storage.sync.get('chosenDir', function(data) {
    console.log(data.chosenDir);
    if ( data.chosenDir ) {
      chrome.fileSystem.isRestorable(data.chosenDir, function(isRestorable) {
        if ( isRestorable ) {
          chrome.fileSystem.restoreEntry(data.chosenDir, function(entry) {
           doEntry(entry);
          });
        } else {
          console.log("No restora")
        }
      });
    }
  });
}
