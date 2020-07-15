// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';

import ticketApi from '../apis/ticket';

const mockedApi = new MockAdapter(ticketApi);

export default mockedApi;
