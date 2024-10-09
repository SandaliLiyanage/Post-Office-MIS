// import BundleService from '../../services/bundleservice';
// import { BundleRepository } from '../../repositeries/bundlerepository';
// import { AddressRepository} from '../../repositeries/addressrepository'
// import PostOfficeRepository from '../../repositeries/postofficerepository';
// jest.mock('../repositeries/bundlerepository');
// jest.mock('../repositeries/addressrepository');
// jest.mock('../repositeries/postofficerepository');

// describe('BundleService', () => {
//     let bundleService: BundleService;
//     let bundleRepository: jest.Mocked<BundleRepository>;
//     let addressRepository: jest.Mocked<AddressRepository>;
//     let postOfficeRepository: jest.Mocked<PostOfficeRepository>;

//     beforeEach(() => {
//         bundleRepository = new BundleRepository() as jest.Mocked<BundleRepository>;
//         addressRepository = new AddressRepository() as jest.Mocked<AddressRepository>;
//         postOfficeRepository = new PostOfficeRepository() as jest.Mocked<PostOfficeRepository>;
//         bundleService = new BundleService();
//     });

//     describe('bundleValidation', () => {
//         it('should return bundleID if bundle is found', async () => {
//             addressRepository.getDestPostalCode.mockResolvedValue('12345');
//             bundleRepository.findBundle.mockResolvedValue([{ bundleID: 1, destPostalCode: '12345' }]);

//             const result = await bundleService.bundleValidation(1, '54321');

//             expect(result).toBe(1);
//         });

//         it('should return null if destPostalCode equals sourcePostalCode', async () => {
//             addressRepository.getDestPostalCode.mockResolvedValue('12345');

//             const result = await bundleService.bundleValidation(1, '12345');

//             expect(result).toBeNull();
//         });

//         it('should create a new bundle if no bundle is found', async () => {
//             addressRepository.getDestPostalCode.mockResolvedValue('12345');
//             bundleRepository.findBundle.mockResolvedValue([]);
//             bundleRepository.createBundle.mockResolvedValue(2);
//             postOfficeRepository.getHeadOffice.mockResolvedValue('54321');

//             const result = await bundleService.bundleValidation(1, '54321');

//             expect(result).toBe(2);
//         });

//         it('should return "dest Postal Code not found" if destPostalCode is not found', async () => {
//             addressRepository.getDestPostalCode.mockResolvedValue(null);

//             const result = await bundleService.bundleValidation(1, '54321');

//             expect(result).toBe('dest Postal Code not found');
//         });
//     });

//     describe('bundleRouteCreation', () => {
//         it('should return correct bundle route', async () => {
//             postOfficeRepository.getHeadOffice.mockResolvedValueOnce('54321').mockResolvedValueOnce('12345');

//             const result = await bundleService.bundleRouteCreation('12345', '54321');

//             expect(result).toEqual(['54321', '54321', '12345', '12345']);
//         });
//     });

//     describe('getCreatedBundles', () => {
//         it('should return created bundles with route names', async () => {
//             bundleRepository.getCreatedBundles.mockResolvedValue([{ destPostalCode: '12345', route: ['54321'] }]);
//             postOfficeRepository.getPostOfficeName.mockResolvedValueOnce({ postOfficeName: 'Dest Office' }).mockResolvedValueOnce({ postOfficeName: 'Source Office' });

//             const result = await bundleService.getCreatedBundles('54321');

//             expect(result).toEqual([{ destPostalCode: 'Dest Office', route: ['Source Office'] }]);
//         });
//     });

//     describe('getDeliveryBundles', () => {
//         it('should return delivery bundles with route names', async () => {
//             bundleRepository.getDeliveryBundles.mockResolvedValue([{ destPostalCode: '12345', route: ['54321'] }]);
//             postOfficeRepository.getPostOfficeName.mockResolvedValueOnce({ postOfficeName: 'Dest Office' }).mockResolvedValueOnce({ postOfficeName: 'Source Office' });

//             const result = await bundleService.getDeliveryBundles('54321');

//             expect(result).toEqual([{ destPostalCode: 'Dest Office', route: ['Source Office'] }]);
//         });
//     });

//     describe('updateStatus', () => {
//         it('should update bundle status', async () => {
//             bundleRepository.updateBundle.mockResolvedValue(true);

//             const result = await bundleService.updateStatus(1);

//             expect(result).toBe(true);
//         });
//     });
// });