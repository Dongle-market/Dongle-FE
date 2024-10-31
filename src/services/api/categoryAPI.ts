// /services/categoryAPI.ts

export async function fetchCategoryData(species: string, sub: string) {
    const response = await fetch(`http://54.180.249.135:4000/apis/item/food?species=${species}&sub=${sub}`);
    if (!response.ok) {
        throw new Error("Failed to fetch category data");
    }
    return response.json();
}
