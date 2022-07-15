// import { HttpClient } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { Office } from 'src/app/offices/models/office.model';
// import { Employee } from '../models/employee.model';
// import { EmployeeService } from './employee.service';
// import {} from 'src/app/constants/urls';
// import { UnitOfMeasure } from '../models/performance-indicator.model';
// describe('ActivityService', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let activityService: ActivityService;
//   const office: Office = { name: '', location: '' };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HttpClient],
//     });
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     activityService = TestBed.inject(ActivityService);
//   });
//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   describe('#getActivities', () => {
//     let expectedResults: Activity[];

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
//       ] as Activity[];
//     });

//     it('should return all Activity Types (called ones)', () => {
//       activityService.getActivities().subscribe({
//         next: (activities) =>
//           expect(activities)
//             .withContext('Should return Activity types')
//             .toEqual(expectedResults),
//         error: fail,
//       });

//       const req = httpTestingController.expectOne(activityService.url);
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

//     it('should return one Activity type (called ones)', () => {
//       activityService.getActivity(1).subscribe({
//         next: (Activity) =>
//           expect(Activity)
//             .withContext('Should return one Activity type')
//             .toEqual(expectedResults[0]),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${activityService.url}/1`);
//       expect(req.request.method).toEqual('GET');
//       req.flush(expectedResults[0]);
//     });
//   });
//   describe('#updateActivity', () => {
//     let updateData: Activity;
//     beforeEach(() => {
//       updateData = {
//         description: 'descript1',
//         owner: office,
//         performanceIndicators: [
//           { name: 'name', unitOfMeasure: UnitOfMeasure.Number },
//         ],
//         objective: {
//           description: 'descript1',
//           goal: { code: '1', description: 'descripttion 1', owner: office },
//           owner: office,
//         },
//       };
//     });

//     it('Should update specific Activity type', () => {
//       activityService.updateActivity(1, updateData).subscribe({
//         next: (response) =>
//           expect(response).withContext('Should update Activity type').toEqual(),
//         error: (e) => {
//           console.log('Error', e);
//         },
//       });
//       const req = httpTestingController.expectOne(`${activityService.url}/1`);
//       expect(req.request.method).toEqual('PUT');
//     });
//   });

//   describe('#addActivity', () => {
//     let activityCreationDto: Activity;
//     let activityDto: Activity;
//     beforeEach(() => {
//       activityCreationDto = {
//         description: 'descript1',
//         owner: office,
//         performanceIndicators: [
//           { name: 'name', unitOfMeasure: UnitOfMeasure.Number },
//         ],
//         objective: {
//           description: 'descript1',
//           goal: { code: '1', description: 'descripttion 1', owner: office },
//           owner: office,
//         },
//       };
//       activityDto = {
//         id: 1,
//         description: 'descript1',
//         owner: office,
//         performanceIndicators: [
//           { name: 'name', unitOfMeasure: UnitOfMeasure.Number },
//         ],
//         objective: {
//           description: 'descript1',
//           goal: { code: '1', description: 'descripttion 1', owner: office },
//           owner: office,
//         },
//       };
//     });
//     it('Should create new Activity type (called once)', () => {
//       activityService.addActivity(activityCreationDto).subscribe({
//         next: (Activity) =>
//           expect(Activity)
//             .withContext('Should Create new Activity')
//             .toEqual(activityDto),
//       });
//       const req = httpTestingController.expectOne(activityService.url);
//       expect(req.request.method).toEqual('POST');
//       req.flush(activityDto);
//     });
//   });

//   describe('#deleteActivity', () => {
//     it('Should Delte Activity', () => {
//       activityService.deleteActivity(1).subscribe({
//         next: (response) =>
//           expect(response).withContext('Should Delete Activity').toEqual(),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${activityService.url}/1`);
//       expect(req.request.method).toEqual('DELETE');
//     });
//   });
// });
