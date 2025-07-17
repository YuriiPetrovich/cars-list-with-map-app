
async function getCars() {
    try{
        const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });

        if (!response.ok){
            throw new Error(`Error! status: ${response.status}`);
        }
        
        const result = await response.json();

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

const carsAPI = {
    getCars: getCars
}

export default carsAPI;