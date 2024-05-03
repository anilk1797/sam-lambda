export async function handler(event) {
    try {
        const token = event.headers.Authorization;
        const expectedToken = 'your_static_token_here';

        if (token !== expectedToken) {
            throw new Error('Unauthorized');
        }

        // Return an IAM policy if token is valid
        return generatePolicy('user', 'Allow', event.methodArn);
    } catch (error) {
        // If the token is invalid, return an unauthorized response
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized' }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}

// Function to generate an IAM policy
function generatePolicy(principalId, effect, resource) {
    const authResponse = {
        principalId: principalId
    };

    if (effect && resource) {
        const policyDocument = {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        };
        authResponse.policyDocument = policyDocument;
    }

    return authResponse;
}
