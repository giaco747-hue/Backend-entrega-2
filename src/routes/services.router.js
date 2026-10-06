import { Router } from 'express';// Importamos tu manager (sin llaves {} porque usaste export default)
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager(); 

router.get('/', async (req, res) => {
    try {
        const { category, available } = req.query; 
        let services = await serviceManager.getServices();

        if (category) {
            services = services.filter(s => s.category === category);
        }
        if (available) {
            const isAvailable = available === 'true';
            services = services.filter(s => s.available === isAvailable);
        }

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios' });
    }
});

router.get('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid); 
        const service = await serviceManager.getServiceById(id);
        
        if (!service) {
            return res.status(404).json({ error: 'Servicio no encontrado' }); 
        }
        res.status(200).json(service); 
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newService = req.body; 
        
        const createdService = await serviceManager.addService(newService);
        
        
        if (createdService.error) {
            return res.status(400).json({ error: createdService.error }); 
        }

        res.status(201).json(createdService); 
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
});


router.put('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const updateData = req.body;

        const updatedService = await serviceManager.updateService(id, updateData);

        if (!updatedService) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
});

router.delete('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const deletedService = await serviceManager.deleteService(id);

        if (!deletedService) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.status(200).json({ message: 'Servicio eliminado con éxito', deletedService });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
});

export default router;