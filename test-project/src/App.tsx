import React, { ReactNode, ReactPortal } from 'react';
import logo from './logo.svg';
import './App.css';
import { Config, Connect, ConnectEvents } from '@vkontakte/superappkit';
import { createPortal } from 'react-dom';

// Config.init({
//   appId: 51762269, // идентификатор приложения
// });
Config.init({
  appId: 51761824, // идентификатор приложения
});

const oneTapButton = Connect.buttonOneTapAuth({
  // Обязательный параметр в который нужно добавить обработчик событий приходящих из SDK
  callback: function (e) {
    const type = e.type;

    if (!type) {
      return false;
    }

    switch (type) {
      case ConnectEvents.OneTapAuthEventsSDK.LOGIN_SUCCESS: // = 'VKSDKOneTapAuthLoginSuccess'
        console.log(e);
        return false;
      // Для этих событий нужно открыть полноценный VK ID чтобы
      // пользователь дорегистрировался или подтвердил телефон
      case ConnectEvents.OneTapAuthEventsSDK.FULL_AUTH_NEEDED:
        console.log('FULL_AUTH_NEEDED');
        break; //  = 'VKSDKOneTapAuthFullAuthNeeded'
      case ConnectEvents.OneTapAuthEventsSDK.PHONE_VALIDATION_NEEDED:
        console.log('PHONE_VALIDATION_NEEDED');
        break; // = 'VKSDKOneTapAuthPhoneValidationNeeded'
      case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN: // = 'VKSDKButtonOneTapAuthShowLogin'
        console.log('SHOW_LOGIN');
        Connect.redirectAuth({
          url: 'https://alexeynewdeveloper.github.io/test-react/test-project/build/index.html',
          state: 'dj29fnsadjsd82',
        });

        break;
      // return Connect.redirectAuth({
      //   url: 'https://alexeynewdeveloper.github.io/test-react/test-project/build/index.html',
      //   state: 'dj29fnsadjsd82',
      // });

      // return Connect.redirectAuth({
      //   url: 'https://alexeynewdeveloper.github.io/test-react/test-project/build/index.html',
      //   state: 'dj29fnsadjsd82',
      // }); // url - строка с url, на который будет произведён редирект после авторизации.
      // state - состояние вашего приложение или любая произвольная строка, которая будет добавлена к url после авторизации.
      // Пользователь перешел по кнопке "Войти другим способом"
      case ConnectEvents.ButtonOneTapAuthEventsSDK.SHOW_LOGIN_OPTIONS: // = 'VKSDKButtonOneTapAuthShowLoginOptions'
      // Параметр screen: phone позволяет сразу открыть окно ввода телефона в VK ID
      // Параметр url: ссылка для перехода после авторизации. Должен иметь https схему. Обязательный параметр.
      // return Connect.redirectAuth({
      //   screen: 'phone',
      //   url: 'https://alexeynewdeveloper.github.io/test-react/test-project/build/index.html',
      // });
    }

    return false;
  },
  // Не обязательный параметр с настройками отображения OneTap
  options: {
    showAlternativeLogin: false, // Отображение кнопки "Войти другим способом"
    displayMode: 'default', // Режим отображения кнопки 'default' | 'name_phone' | 'phone_name'
    buttonStyles: {
      borderRadius: 8, // Радиус скругления кнопок
    },
  },
});

// Получить iframe можно с помощью метода getFrame()
if (oneTapButton) {
  const iframeVK = oneTapButton.getFrame();
  if (iframeVK) {
    document.body.appendChild(iframeVK);
  }
}

// Удалить iframe можно с помощью OneTapButton.destroy();

// const iframeVK = oneTapButton?.getFrame();

function App() {
  console.log(window.location.href);
  return (
    <div className='App'>
      <header className='App-header'></header>
      <section></section>
    </div>
  );
}

export default App;
