import axios from 'axios';
import axiosBetterStacktrace from 'axios-better-stacktrace';

axiosBetterStacktrace(axios);

export default {
  async getAvatar(id: number): Promise<string> {
    const response = await axios.get<{ thumbnailUrl: string }>(`https://jsonplaceholder.typicode.com/photos/${id}`);

    return response.data.thumbnailUrl;
  },
};
