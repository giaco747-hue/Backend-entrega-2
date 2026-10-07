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
        const { name, description, duration, price, category, available } = req.body;
        
        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            return res.status(400).json({ 
                error: 'Faltan campos obligatorios. Se requiere: name, description, duration, price, category y available.' 
            });
        }

        const createdService = await serviceManager.addService(req.body);
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio' });
    }
});

router.put('/:sid', async (req, res) => {
    try {
        const id = parseInt(req.params.sid);
        const { name, description, duration, price, category, available } = req.body;

        if (!name || !description || duration === undefined || price === undefined || !category || available === undefined) {
            return res.status(400).json({ 
                error: 'Para actualizar se requieren todos los campos: name, description, duration, price, category y available.' 
            });
        }

        const updatedService = await serviceManager.updateService(id, req.body);

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