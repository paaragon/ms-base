import customExpress from '../../lib/customExpress/customExpress';
import healthCtrl from '../controllers/health.ctrl';

const app = customExpress();

app.get('/', healthCtrl.getHealth);

export default app;
