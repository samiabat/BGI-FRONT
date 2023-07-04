// import { HttpClient } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { Office } from 'src/app/offices/models/office.model';
// import { Goal } from '../models/role.model';
// import { GoalService } from './role.service';
// import {} from 'src/app/constants/urls';
// describe('GoalService', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;
//   let goalService: GoalService;
//   const office: Office = { name: '', location: '' };

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HttpClient],
//     });
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//     goalService = TestBed.inject(GoalService);
//   });
//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   describe('#getGoals', () => {
//     let expectedResults: Goal[];

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
//       ] as Goal[];
//     });

//     it('should return all Goal Types (called ones)', () => {
//       goalService.getGoals().subscribe({
//         next: (Goals) =>
//           expect(Goals)
//             .withContext('Should return Goal types')
//             .toEqual(expectedResults),
//         error: fail,
//       });

//       const req = httpTestingController.expectOne(goalService.url);
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

//     it('should return one Goal type (called ones)', () => {
//       goalService.getGoal(1).subscribe({
//         next: (Goal) =>
//           expect(Goal)
//             .withContext('Should return one Goal type')
//             .toEqual(expectedResults[0]),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${goalService.url}/1`);
//       expect(req.request.method).toEqual('GET');
//       req.flush(expectedResults[0]);
//     });
//   });
//   describe('#updateGoal', () => {
//     let updateData: Goal;
//     beforeEach(() => {
//       updateData = {
//         code: '1',
//         description: 'descript1',
//         owner: office,
//       };
//     });

//     it('Should update specific Goal type', () => {
//       goalService.updateGoal(1, updateData).subscribe({
//         next: (response) =>
//           expect(response).withContext('Should update Goal type').toEqual(),
//         error: (e) => {
//           console.log('Error', e);
//         },
//       });
//       const req = httpTestingController.expectOne(`${goalService.url}/1`);
//       expect(req.request.method).toEqual('PUT');
//     });
//   });

//   describe('#addGoal', () => {
//     let goalCreationDto: Goal;
//     let goalDto: Goal;
//     beforeEach(() => {
//       goalCreationDto = {
//         code: '1',
//         description: 'descript1',
//         owner: office,
//       };
//       goalDto = {
//         id: 1,
//         code: '1',
//         description: 'descript1',
//         owner: office,
//       };
//     });
//     it('Should create new Goal type (called once)', () => {
//       goalService.addGoal(goalCreationDto).subscribe({
//         next: (Goal) =>
//           expect(Goal).withContext('Should Create new Goal').toEqual(goalDto),
//       });
//       const req = httpTestingController.expectOne(goalService.url);
//       expect(req.request.method).toEqual('POST');
//       req.flush(goalDto);
//     });
//   });

//   describe('#deleteGoal', () => {
//     it('Should Delte Goal', () => {
//       goalService.deleteGoal(1).subscribe({
//         next: (response) =>
//           expect(response).withContext('Should Delete Goal').toEqual(),
//         error: fail,
//       });
//       const req = httpTestingController.expectOne(`${goalService.url}/1`);
//       expect(req.request.method).toEqual('DELETE');
//     });
//   });
// });
