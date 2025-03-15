import { render, screen } from 'utils/test/test-utils';
import { vi } from 'vitest';
import { Pagination, PaginationProps } from './Pagination';

const props: PaginationProps = {
  goNextPage: vi.fn(),
  hasDetails: false,
  goPreviousPage: vi.fn(),
  onPageChange: vi.fn(),
  page: 1,
  limit: 1,
  totalItems: 2,
  totalPages: Math.ceil(2 / 1),
  hasNextPage: true,
  hasPrevPage: false,
};

describe('<Pagination />', () => {
  it('should render the component', () => {
    render(<Pagination {...props} />);

    const prevButton = screen.getByTestId('prev-button');
    const nextButton = screen.getByTestId('next-button');

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  it('should render the component', () => {
    const itemsPerPage = 1;
    const totalItems = 11;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    render(
      <Pagination
        {...props}
        totalItems={totalItems}
        totalPages={totalPages}
        limit={itemsPerPage}
      />,
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '11' })).toBeInTheDocument();
  });

  it('should jump page counter after 1', () => {
    const itemsPerPage = 1;
    const totalItems = 11;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const page = 5

    render(
      <Pagination
        {...props}
        totalItems={totalItems}
        totalPages={totalPages}
        limit={itemsPerPage}
        page={page}
      />,
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '11' })).toBeInTheDocument();
  });

  it('should render details information', () => {
    const itemsPerPage = 2;
    const totalItems = 11;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const page = 1

    render(
      <Pagination
        {...props}
        totalItems={totalItems}
        totalPages={totalPages}
        limit={itemsPerPage}
        page={page}
        hasDetails={true}
      />,
    );

    expect(screen.getByTestId('pagination-details')).toBeInTheDocument()
  });
});
