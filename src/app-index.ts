import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './pages/app-home';
import './components/header';
import './styles/global.css';
import { router } from './router';

@customElement('app-index')
export class AppIndex extends LitElement {
  @state() affirmations: string = ''; // State to store affirmations
  @state() notifications: Array<{ time: string, message: string }> = []; // State for notifications

  static styles = css`
    main {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 16px;
    }
    input, textarea {
      display: block;
      margin: 10px 0;
    }
  `;

  firstUpdated() {
    // Load affirmations from localStorage
    const savedAffirmations = localStorage.getItem('affirmations');
    if (savedAffirmations) {
      this.affirmations = savedAffirmations;
    }

    // Router update logic
    router.addEventListener('route-changed', () => {
      if ("startViewTransition" in document) {
        (document as any).startViewTransition(() => this.requestUpdate());
      } else {
        this.requestUpdate();
      }
    });
  }

  // Save affirmations
  saveAffirmations() {
    localStorage.setItem('affirmations', this.affirmations);
    alert('Аффирмации сохранены!');
  }

  // Schedule a notification
  scheduleNotification(time: string, message: string) {
    const now = new Date();
    const notificationTime = new Date();
    const [hours, minutes] = time.split(':');
    notificationTime.setHours(Number(hours), Number(minutes), 0);

    const delay = notificationTime.getTime() - now.getTime();

    if (delay > 0 && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification(message);
      }, delay);

      this.notifications = [...this.notifications, { time, message }];
    } else {
      alert('Выберите будущее время и убедитесь, что уведомления разрешены.');
    }
  }

  // Render method
  render() {
    return html`
      <main>
        <h1>Wealth Push</h1>

        <h2>Запланируйте уведомление</h2>
        <input type="time" id="time" />
        <input type="text" id="message" placeholder="Введите текст уведомления" />
        <button @click=${() => this.scheduleNotification((this.shadowRoot!.getElementById('time') as HTMLInputElement).value, (this.shadowRoot!.getElementById('message') as HTMLInputElement).value)}>Установить уведомление</button>

        <h2>Ваши аффирмации</h2>
          <textarea id="affirmations" .value=${this.affirmations} @input=${(e: Event) => this.affirmations = (e.target as HTMLTextAreaElement).value} placeholder="Введите ваши аффирмации здесь"></textarea>
          <button @click=${this.saveAffirmations}>Сохранить аффирмации</button>

          <h2>Запланированные уведомления</h2>
          <ul>
            ${this.notifications.map(notification => html`
              <li>${notification.time} - ${notification.message}</li>
            `)}
          </ul>
        </main>
      `;
  }
}

