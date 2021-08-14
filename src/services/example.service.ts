import axios from 'axios';
import axiosBetterStacktrace from 'axios-better-stacktrace';
import Example from '../models/example.model';

axiosBetterStacktrace(axios);

export default {
    async getExample(id: string): Promise<Example> {
        const response = await axios.get<Example>(`https://jsonplaceholder.typicode.com/posts/${id}`);

        return response.data;
    },

    async addExample(example: Example): Promise<Example> {
        const headers: any = {
            'Content-type': 'application/json; charset=UTF-8',
        };
        const body = example;

        const response = await axios.post<Example>(`https://jsonplaceholder.typicode.com/posts`, body, { headers });

        return response.data;
    }
}