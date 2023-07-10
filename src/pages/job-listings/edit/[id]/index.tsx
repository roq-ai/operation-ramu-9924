import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getJobListingById, updateJobListingById } from 'apiSdk/job-listings';
import { Error } from 'components/error';
import { jobListingValidationSchema } from 'validationSchema/job-listings';
import { JobListingInterface } from 'interfaces/job-listing';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { EmployerInterface } from 'interfaces/employer';
import { getEmployers } from 'apiSdk/employers';

function JobListingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<JobListingInterface>(
    () => (id ? `/job-listings/${id}` : null),
    () => getJobListingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: JobListingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateJobListingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/job-listings');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<JobListingInterface>({
    initialValues: data,
    validationSchema: jobListingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Job Listing
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
              <FormLabel>Title</FormLabel>
              <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
              {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="requirements" mb="4" isInvalid={!!formik.errors?.requirements}>
              <FormLabel>Requirements</FormLabel>
              <Input
                type="text"
                name="requirements"
                value={formik.values?.requirements}
                onChange={formik.handleChange}
              />
              {formik.errors.requirements && <FormErrorMessage>{formik.errors?.requirements}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<EmployerInterface>
              formik={formik}
              name={'employer_id'}
              label={'Select Employer'}
              placeholder={'Select Employer'}
              fetcher={getEmployers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'job_listing',
    operation: AccessOperationEnum.UPDATE,
  }),
)(JobListingEditPage);
