import { render, screen, waitFor } from "@testing-library/react";
import About from "./About";
import userEvent from "@testing-library/user-event";
import { test, describe, expect } from "vitest";

/*
 describe("About Component", () => {
 	test("renders About Page as a text", () => {
 		//Arrange
 		render(<About />);
 		//Act
 		// ... nothing
 		//Assert
 		const aboutPageElement = screen.getByText("About Page");
 		expect(aboutPageElement).toBeInTheDocument();
 	});
 	test("renders About Page exactly as a text", () => {
 		//Arrange
 		render(<About />);
 		//Act
 		// ... nothing
 		//Assert
 		const aboutPageExactElement = screen.getByText("About Page", {
 			exact: true,
 		});
 		expect(aboutPageExactElement).toBeInTheDocument();
 	});
 	test("renders About page as a text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("about page", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 	test("renders About as a text", () => {
 		//Arrange
 		render(<About />);
 		//Act
 		// ... nothing
 		//Assert
 		const aboutElement = screen.getByText("About", { exact: false });
 		expect(aboutElement).toBeInTheDocument();
 	});
 	test("renders Page as a text", () => {
 		render(<About />);
 		const pageElement = screen.getByText("Page", { exact: false });
 		expect(pageElement).toBeInTheDocument();
 	});
 
 	test("renders Contrary as text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("Contrary", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 	test("renders popular as text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("popular", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 	test("renders belief as text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("belief", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 	test("renders Renaissance as text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("Renaissance", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 	test("renders chunk as text", () => {
 		render(<About />);
 		const AboutElement = screen.getByText("chunk", { exact: false });
 		expect(AboutElement).toBeInTheDocument();
 	});
 });

 */

describe("About Component user Interaction/ Testing User Actions", () => {
  /*test("renders 'This is webapp description Section' if the button was NOT clicked", () => {
    render(<About />);

    const outputElement = screen.getByText( "This is webapp description Section");
    expect(outputElement).toBeInTheDocument();});*/

  test("renders 'changed!' as a text if the button was Clicked",async () => {
	//arrange
    render(<About />);
//act
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

	//assert
		const outputElement = await screen.findByText("Changed!", { exact: false });
    expect(outputElement).toBeInTheDocument();
	
    
  });

 /* test("doesn't render 'This is webapp descripton Section'  if button is clicked", async() => {
    render(<About />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

	await waitFor(()=>{
		const outputElement = screen.queryByText("This is webapp description Section",{ exact: true });
		  expect(outputElement).toBeNull();
		});
	})*/
    
});describe('Async About component Testing', () => {

	// Helper function to mock the fetch request and render the component
	const mockFetchAndRender = (response) => {
	  window.fetch = vi.fn().mockResolvedValueOnce({
		json: async () => response,
	  });
	  render(<About />);
	};
  
	test("renders posts if request succeeds", async () => {
	  const mockPosts = [{ id: "p1", title: "First post" }];
	  mockFetchAndRender(mockPosts);
  
	  const listItemElements = await screen.findAllByRole("listitem");
	  expect(listItemElements).toHaveLength(mockPosts.length);
  
	  const outputElement = await screen.findByText("First post", { exact: false });
	  expect(outputElement).toBeInTheDocument();
	});
  
	test("check post texts if request succeeds", async () => {
	  const mockPosts = [{ id: "p1", title: "First post" }];
	  mockFetchAndRender(mockPosts);
  
	  const listItemElements = await screen.findAllByRole("listitem");
	  expect(listItemElements).toHaveLength(mockPosts.length);
  
	  const outputElement = await screen.findByText("First post", { exact: false });
	  expect(outputElement).toBeInTheDocument();
	});
  
	test("check post length if request succeeds", async () => {
	  const mockPosts = [{ id: "p1", title: "First post" }];
	  mockFetchAndRender(mockPosts);
  
	  const listItemElements = await screen.findAllByRole("listitem");
	  expect(listItemElements).toHaveLength(mockPosts.length);
	});
  
	test("check posts rendering after request succeeds", async () => {
	  const mockPosts = [{ id: "p1", title: "First post" }];
	  mockFetchAndRender(mockPosts);
  
	  const listItemElements = await screen.findAllByRole("listitem");
	  expect(listItemElements).toHaveLength(mockPosts.length);
	  expect(listItemElements[0]).toHaveTextContent("First post");
	});
  
  });