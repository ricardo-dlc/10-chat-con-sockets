function scrollBottom() {
    // selectors
    const newMessage = divChatbox.children('li:last-child');

    // heights
    const clientHeight = divChatbox.prop('clientHeight');
    const scrollTop = divChatbox.prop('scrollTop');
    const scrollHeight = divChatbox.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}
