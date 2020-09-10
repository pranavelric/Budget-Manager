$(function () {
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
   
    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (buget) {
            var newTotal = 0;
            if (buget.total) {
                newTotal += parseInt(buget.total);
            }
            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({ 'total': newTotal }, function () {
                if (amount && newTotal >= buget.limit) {
                    var notifObject = {
                        type: 'basic',
                        iconUrl: '48chat.png',
                        title: 'Limit reached',
                        message: 'Uh oh looks like you have reached your limit'
                    };
                    chrome.notifications.create('limitNotif', notifObject);
                }
            });
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});

 
