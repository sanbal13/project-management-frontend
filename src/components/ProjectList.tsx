import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';

interface project {
    id: number,
    name: string,
    owner: string
};

function ProjectList() {
    const [data, setData] = useState<project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_PROJECT_URI);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(axios.isAxiosError(err) ? err : new AxiosError('An unexpected eror occurred'));
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>
    }

    return (
        <div>
            <Typography variant="h6">Fetched Users:</Typography>
            <List>
                {
                    data.map((project) => (
                        <ListItem key={project.id}>
                            <ListItemText primary={project.name} secondary={project.owner} />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );

}

export default ProjectList;

