import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import gamesMock from 'components/GameCardSlider/mock';
import highlightMock from 'components/Highlight/mock';

import Wishlist from '.';

const props = {
  games: gamesMock,
  recommendedGamesTitle: 'Recommended Games',
  recommendedGames: gamesMock,
  recommendedHighlight: highlightMock
};

jest.mock('components/Showcase', () => ({
  __esModule: true,
  default: function Mock() {
    return <div data-testid="Mock Showcase" />;
  }
}));

describe('<Wishlist />', () => {
  it('should render correctly', () => {
    renderWithTheme(<Wishlist {...props} />);

    expect(
      screen.getByRole('heading', { name: /wishlist/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/population zero/i)).toHaveLength(6);
    expect(screen.getByTestId('Mock Showcase')).toBeInTheDocument();
  });

  it('should render empty when there are no games', () => {
    renderWithTheme(
      <Wishlist
        recommendedGamesTitle="Recommended Games"
        recommendedGames={gamesMock}
        recommendedHighlight={highlightMock}
      />
    );

    expect(screen.queryByText(/population zero/i)).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /your wishlist is empty/i })
    ).toBeInTheDocument();
  });
});
