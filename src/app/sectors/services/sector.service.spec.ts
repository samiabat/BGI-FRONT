// import { Office } from 'src/app/offices/models/office.model';
// import { HttpClient } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { SectorService } from './sector.service';
// import { Sector } from '../models/sector.model';
// describe('ObjectiveService', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let sectorService: SectorService;
//   const office: Office = { name: '', location: '' };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HttpClient],
//     });
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     sectorService = TestBed.inject(SectorService);
//   });
//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   describe('#getObjectives', () => {
//     let expectedResults: Sector[];

//     beforeEach(() => {
      
//       expectedResults = [
//         {
//           id: 1,
//           description: 'descript1',
//           owner: office,
//         },
//         {          
//           id: 2,
//           description: 'descript1',
//           owner: office,
//         },
//       ] as Sector[];
//     });

//     it('should return all Objective Types (called ones)', () => {
//       sectorService.getSectors().subscribe({
//         next: (sectors) =>
//           expect(sectors)
//             .withContext('Should return Objective types')
//             .toEqual(expectedResults),
//         error: fail,
//       });

//       const req = httpTestingController.expectOne(sectorService.url);
//       expect(req.request.method).toEqual('GET');
//       req.flush([
//         {
//           id: 1,
//           description: 'descript1',
//           owner: office,
//         },
//         {
//           id: 2,
//           description: 'descript1',
//           owner: office,
//         },
//       ]);
//     });

//     it('should return one Objective type (called ones)', () => {
//       sectorService.getSector(1).subscribe({
//         next: (sector) =>
//           expect(sector)
//             .withContext('Should return one sector type')
//             .toEqual(expectedResults[0]),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${sectorService.url}/1`);
//       expect(req.request.method).toEqual('GET');
//       req.flush(expectedResults[0]);
//     });
//   });
//   describe('#updateObjective', () => {
//     let updateData: Sector;
//     beforeEach(() => {
//       updateData = {
//         description: 'descript1',
//         goal: { code: '1', description: 'descripttion 1', owner: office },
//         owner: office,
//       };
//     });

//     it('Should update specific Objective type', () => {
//       sectorService.updateSector(1, updateData).subscribe({
//         next: (response) =>
//           expect(response)
//             .withContext('Should update Objective type')
//             .toEqual(),
//         error: (e) => {
//           console.log('Error', e);
//         },
//       });
//       const req = httpTestingController.expectOne(`${sectorService.url}/1`);
//       expect(req.request.method).toEqual('PUT');
//     });
//   });

//   describe('#addSector', () => {
//     let sectorCreationDto: Sector;
//     let sectorDto: Sector;
//     beforeEach(() => {
//       sectorCreationDto = {
//         description: 'descript1',
//         goal: { code: '1', description: 'descripttion 1', owner: office },
//         owner: office,
//       };
//       sectorDto = {
//         id: 1,
//         description: 'descript1',
//         goal: { code: '1', description: 'descripttion 1', owner: office },
//         owner: office,
//       };
//     });
//     it('Should create new Objective type (called once)', () => {
//       sectorService.addSector(sectorCreationDto).subscribe({
//         next: (sector) =>
//           expect(sector)
//             .withContext('Should Create new Objective')
//             .toEqual(sectorDto),
//       });
//       const req = httpTestingController.expectOne(sectorService.url);
//       expect(req.request.method).toEqual('POST');
//       req.flush(sectorDto);
//     });
//   });

//   describe('#deleteObjective', () => {
//     it('Should Delete Objective', () => {
//       sectorService.deleteSector(1).subscribe({
//         next: (response) =>
//           expect(response).withContext('Should Delete Objective').toEqual(),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${sectorService.url}/1`);
//       expect(req.request.method).toEqual('DELETE');
//     });
//   });
// });
