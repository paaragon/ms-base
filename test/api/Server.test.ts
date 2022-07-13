import * as http from 'http';
import Server from '../../src/api/server';

describe('Server tests', () => {
  test('Start OK', (done) => {
    const port = 3001;
    const server = new Server(port);

    const addMock = jest.spyOn(server['app'], 'listen');
    addMock.mockImplementation((port: number, callback?: () => void): http.Server => {
      expect(port).toBe(port);
      done();
      return {} as http.Server;
    });

    server.start();
  });
});
