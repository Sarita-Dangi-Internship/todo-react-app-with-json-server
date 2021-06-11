import http from "../utils/http";
import config from "../config";

const { api } = config;


/**
 *Function to get all todo lists
 *
 */
export async function fetchTask(){ 
    const url = `${api.endpoints.todo}`;
    const response = await http.get(url);
    
    return response; 
};

/**
 *Function to add new task
 *
 * @export
 * @param {*} data
 * @return {*} 
 */
export async function addNewTask(data){ 
    const url = `${api.endpoints.todo}`;
    const response = await http.post(url, data);
    
    return response;
};
  
/**
 *Function to delete task
 * @export
 * @param {*} taskId
 * @param {*} data
 * @return {*} 
 */
export async function deletetaskId(taskId){ 
    const url = `${api.endpoints.todo}/${taskId}`;
    const response = await http.delete(url);
    
    return response;
};

/**
 *Function to edit task
 *
 * @export
 * @param {*} taskId
 * @param {*} data
 * @return {*} 
 */
export async function editTaskById(taskId, data){ 
    const url = `${api.endpoints.todo}/${taskId}`;
    const response = await http.patch(url, data);
    
    return response;
};