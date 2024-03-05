import { act, fireEvent, getByRole, getByTestId, render, screen, waitFor} from "@testing-library/react";
import axios from 'axios';
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from "vitest";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar";

vi.mock('axios');

describe('test autocomplete component', () => {
    it("autocomplete should render", () => {
        render(<AutoCompleteSearchBar />)
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Search for products')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your search products')).toBeInTheDocument()
    })

    it('Should be able to type input', async() => {
        render(<AutoCompleteSearchBar />)
        const user = userEvent.setup()
        screen.logTestingPlaygroundURL()
        const input = screen.getByRole('textbox', {
            name: /search\-input\-field/i
          });
        await user.type(input, 'men')
        expect(input).toHaveValue('men')
    })

    it('Fetch products from API and display them', async() => {
        render(<AutoCompleteSearchBar />)
        const input = screen.getByPlaceholderText('Enter your search products')
          input.focus()
          fireEvent.change(input, { target: { value: 'men' } });
          fireEvent.keyDown(input, { key: 'ArrowDown' });
          fireEvent.keyDown(input, { key: 'Enter' });
          expect(input).toHaveValue('men');
    })

})