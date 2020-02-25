import { environment } from 'src/environments/environment';

const api = environment.apiHost;

export const APP_URL = {
    'auth': {
        login: api + 'login',
        register: api + 'register',
        logout: api + 'logout',
        forgot: api + 'user/forgot',
        confirm: api + 'user/confirm',
        change: api + 'user/change',
        role: api + 'role',
        save: api + 'set-device',
        specialization: api + 'specialization'
    },
    'category': {
        index: api + 'category/get-products'
    },
    'vinil-info': {
        index: api + 'product',
        create: api + 'chat'
    },
    'product': {
        index: api + 'product'
    },
    'chat': {
        index: api + 'chat',
        push: api + 'send-message',
        delete: api + 'chat',
        startDialog: api + 'enter-chat',
        files: api + 'add-files'
    },
    'news': {
        index: api + 'news',
        delete: api + 'news',
        create: api + 'news'
    },
    'user': {
        index: api + 'user',
        update: api + 'user',
        avatar: api + 'user',
        user: api + 'user',
        create: api + 'chat',
        news: api + 'news',
        deleteNews: api + 'news',
        logout: api + 'logout',
        subscribe: api + 'subscribes',
        specialization: api + 'specialization'
    },
    'cart': {
        buy: api + 'mail'
    },
    'collegues': {
        last: api + 'last-colleagues',
        all: api + 'colleagues',
        my: api + 'subscribes',
        create: api + 'chat',
    },
    'claim': {
        index: api + 'user/claim'
    },
    'support': {
        index: api + 'feedback'
    },
    'comments': {
        get: api + 'product',
        set: api + 'product-comment',
        news: api + 'news',
        user: api + 'user',
        product: api + 'product'
    },
    'setComments': {
        news: api + 'news-comments',
        user: api + 'user-comment',
        product: api + 'product-comment'
    },
    'usersAndNews': {
        getUsers: api + 'user',
        setUsers: api + 'user-comment',
        getNews: api + 'news',
        setNews: api + 'news-comments',
        deleteComments: api + 'news-comments'
    },
    'notification': {
        index: api + 'user-notification',
        look: api + 'check-notifications',
        count: api + 'new-notification-count',
        all: api + 'check-notifications'
    },
    'create-news': {
        create: api + 'news'
    },
    'invite': {
        index: api + 'invite'
    },
    'filter': {
        index: api + 'provider',
        category: api + 'category'
    },
    'filter-collegues': {
        index: api + 'specialization'
    },
    'about': {
        index: api + 'about'
    }
}