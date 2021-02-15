import { screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import filterItemsMock from 'components/ExploreSidebar/mock';
import apolloCache from 'utils/apolloCache';
import { renderWithTheme } from 'utils/tests/helpers';
import { fetchMoreMock, gamesMock } from './mocks';

import Games from '.';
import userEvent from '@testing-library/user-event';

jest.mock('templates/Base', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock Base">{children}</div>;
  }
}));

jest.mock('components/ExploreSidebar', () => ({
  __esModule: true,
  default: function Mock({ children }: { children: React.ReactNode }) {
    return <div data-testid="Mock ExploreSidebar">{children}</div>;
  }
}));

describe('<Games />', () => {
  it('should render loading when starting the template', () => {
    renderWithTheme(
      <MockedProvider mocks={[]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render sections', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock]} addTypename={false}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    expect(
      await screen.findByTestId('Mock ExploreSidebar')
    ).toBeInTheDocument();
    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument();

    expect(
      await screen.findByRole('button', { name: /show more/i })
    ).toBeInTheDocument();
  });

  it('should render more games when show more is clicked', async () => {
    renderWithTheme(
      <MockedProvider mocks={[gamesMock, fetchMoreMock]} cache={apolloCache}>
        <Games filterItems={filterItemsMock} />
      </MockedProvider>
    );

    expect(await screen.findByText(/Sample Game/i)).toBeInTheDocument();

    screen.logTestingPlaygroundURL();

    userEvent.click(await screen.findByRole('button', { name: /show more/i }));

    expect(await screen.findByText(/Fetch More Game/i)).toBeInTheDocument();
  });
});
