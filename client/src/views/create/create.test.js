import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Create from './create.component';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Create Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            temperaments: [], // Puedes añadir datos simulados según tus necesidades
        });
    });

    it('renders the component', () => {
        render(
            <Provider store={store}>
                <Create />
            </Provider>
        );

        // Agrega más aserciones según los elementos que esperas en tu componente
        expect(screen.getByText('CREATE A DOG!')).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        render(
            <Provider store={store}>
                <Create />
            </Provider>
        );

        // Puedes usar userEvent o fireEvent para interactuar con los elementos del formulario
        userEvent.type(screen.getByLabelText('Name:'), 'Bulldog');
        userEvent.type(screen.getByLabelText('Image URL:'), 'https://example.com/bulldog.jpg');
        userEvent.type(screen.getByLabelText('Min. Height:'), '30');
        userEvent.type(screen.getByLabelText('Max. Height:'), '40');
        userEvent.type(screen.getByLabelText('Min Weight:'), '20');
        userEvent.type(screen.getByLabelText('Max Weight:'), '30');
        userEvent.type(screen.getByLabelText('Life Span:'), '10');

        // Seleccionar temperamento
        userEvent.selectOptions(screen.getByLabelText('Temperaments:'), '{"id": 1, "name": "Friendly"}');

        // Puedes agregar más interacciones según tu formulario

        // Hacer clic en el botón de envío
        userEvent.click(screen.getByText('Create!'));

        // Asegurarse de que se ha enviado el formulario correctamente
        // Agrega más aserciones según el comportamiento esperado
        expect(screen.getByText('You have created a breed of dog!')).toBeInTheDocument();
    });

    // Agrega más tests según sea necesario para cubrir otros casos de uso y funcionalidades de tu componente
});