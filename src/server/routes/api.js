import express from 'express';
import * as seoController from '../controllers/seoController.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

// SEO Endpoints
router.get('/audit/:domain', seoController.runAudit);
router.get('/keywords/:domain', seoController.getKeywords);
router.get('/backlinks/:domain', seoController.getBacklinks);
router.get('/domain-overview/:domain', seoController.getDomainOverview);

// AI SEO Endpoints
router.post('/ai/analysis', seoController.runAiAnalysis);
router.get('/ai/visibility/:domain', seoController.getAiVisibility);

// Admin Endpoints
router.get('/admin/users', adminController.getUsers);
router.post('/admin/users', adminController.createUser);
router.put('/admin/users/:id', adminController.updateUser);
router.delete('/admin/users/:id', adminController.deleteUser);
router.get('/admin/settings', adminController.getSettings);
router.put('/admin/settings', adminController.updateSettings);

export default router;
