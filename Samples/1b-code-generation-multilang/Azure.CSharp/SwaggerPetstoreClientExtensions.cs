// Code generated by Microsoft (R) AutoRest Code Generator 1.0.1.0
// Changes may cause incorrect behavior and will be lost if the code is
// regenerated.

namespace Petstore
{
    using Microsoft.Rest;
    using Microsoft.Rest.Azure;
    using Models;
    using System.Collections;
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;

    /// <summary>
    /// Extension methods for SwaggerPetstoreClient.
    /// </summary>
    public static partial class SwaggerPetstoreClientExtensions
    {
            /// <summary>
            /// List all pets
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='limit'>
            /// How many items to return at one time (max 100)
            /// </param>
            public static IList<Pet> ListPets(this ISwaggerPetstoreClient operations, int? limit = default(int?))
            {
                return operations.ListPetsAsync(limit).GetAwaiter().GetResult();
            }

            /// <summary>
            /// List all pets
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='limit'>
            /// How many items to return at one time (max 100)
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<IList<Pet>> ListPetsAsync(this ISwaggerPetstoreClient operations, int? limit = default(int?), CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.ListPetsWithHttpMessagesAsync(limit, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

            /// <summary>
            /// Create a pet
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            public static void CreatePets(this ISwaggerPetstoreClient operations)
            {
                operations.CreatePetsAsync().GetAwaiter().GetResult();
            }

            /// <summary>
            /// Create a pet
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task CreatePetsAsync(this ISwaggerPetstoreClient operations, CancellationToken cancellationToken = default(CancellationToken))
            {
                (await operations.CreatePetsWithHttpMessagesAsync(null, cancellationToken).ConfigureAwait(false)).Dispose();
            }

            /// <summary>
            /// Info for a specific pet
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='petId'>
            /// The id of the pet to retrieve
            /// </param>
            public static IList<Pet> ShowPetById(this ISwaggerPetstoreClient operations, string petId)
            {
                return operations.ShowPetByIdAsync(petId).GetAwaiter().GetResult();
            }

            /// <summary>
            /// Info for a specific pet
            /// </summary>
            /// <param name='operations'>
            /// The operations group for this extension method.
            /// </param>
            /// <param name='petId'>
            /// The id of the pet to retrieve
            /// </param>
            /// <param name='cancellationToken'>
            /// The cancellation token.
            /// </param>
            public static async Task<IList<Pet>> ShowPetByIdAsync(this ISwaggerPetstoreClient operations, string petId, CancellationToken cancellationToken = default(CancellationToken))
            {
                using (var _result = await operations.ShowPetByIdWithHttpMessagesAsync(petId, null, cancellationToken).ConfigureAwait(false))
                {
                    return _result.Body;
                }
            }

    }
}