import healthCtrl from '../controllers/health.ctrl';
import customExpress from '../lib/customExpress/customExpress';

const app = customExpress();

app.get('/', healthCtrl.getHealth);

export default app;
