

export async function POST(req) {

    Notification.requestPermission((result) => {
          console.log(result);
        });
        await navigator.serviceWorker.register()
        const img = "/to-do-notifications/img/icon-128.png";
        const text = `HEY! Your task "${title}" is now overdue.`;
        const notification = new Notification("To do list", { body: text, icon: img });
        
}