// Saves options to chrome.storage
function save_options() {
  var display = document.getElementById('display').value;
  var willRunLocally = document.getElementById('local').checked;

  chrome.storage.sync.set({
    preferredDisplay: display,
    runningLocally: willRunLocally
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    preferredDisplay: 'mole',
    runningLocally: false
  }, function(items) {
    document.getElementById('display').value = items.preferredDisplay;
    document.getElementById('local').checked = items.runningLocally;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
