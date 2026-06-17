import { Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Event-Managment',message: "this Api docs for Event managment Website" });
});

export default router;
