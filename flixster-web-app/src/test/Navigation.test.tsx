import React from "react";
import { render, screen} from "@testing-library/react"
import Navigation from "../components/Navigation/Navigation";

describe ('Navigation Component', () => {
  beforeEach(() => {
    // mocks states in navigation component
    const setStateMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const useStateMock: any = (useState: any) => [useState, setStateMock];
    vi.spyOn(React, 'useState').mockImplementation(useStateMock);
  })
  test('Navigation component renders', () => {
    render(<Navigation/>);
    // check existence of title
    expect(screen.getByText('Flixster')).toBeInTheDocument();
    });
});
