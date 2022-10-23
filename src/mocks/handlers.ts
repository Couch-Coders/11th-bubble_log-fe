import { rest } from 'msw';

export const handlers = [
  rest.post('/logs', (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.get('/logs', (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    console.log(query);
  }),
];
